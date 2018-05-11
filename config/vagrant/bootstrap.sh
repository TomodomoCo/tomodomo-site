#!/usr/bin/env bash

# Update function
Update () {
    sudo apt-get update
    sudo apt-get upgrade
}

# Immediately run updates
Update

# MySQL Root Password
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password root"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password root"

# Install some helpful tools
sudo apt-get install -y --force-yes python-software-properties vim htop curl git

# Add PPAs
sudo add-apt-repository ppa:ondrej/php

# Run updates again
Update

# Install packages
sudo apt-get install -y --force-yes apache2 mysql-server-5.6 git-core
sudo apt-get install -y --force-yes php7.0-common php7.0-dev php7.0-json php7.0-opcache php7.0-cli libapache2-mod-php7.0 php7.0 php7.0-mysql php7.0-fpm php7.0-curl php7.0-gd php7.0-mcrypt php7.0-mbstring php7.0-bcmath php7.0-zip php7.0-xdebug

# Run updates again
Update

# Set up the shared folder paths
sudo ln -fTs /vagrant /home/vagrant/${APP_DOMAIN}/current
sudo mkdir -p /home/vagrant/logs/apache
sudo mkdir /home/vagrant/phpmyadmin

# Apache/PHP config
cat /home/vagrant/${APP_DOMAIN}/current/config/vagrant/php.ini > /etc/php/7.0/apache2/php.ini
sudo a2enmod rewrite

# Download and "install" phpMyAdmin
wget -nv -O pma.tar.gz https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-english.tar.gz
sudo tar -xzvf pma.tar.gz -C /home/vagrant/phpmyadmin --strip-components=1
rm pma.tar.gz

# Insert our Apache vhost config
cat << EOF | sudo tee /etc/apache2/sites-available/default.conf
<Directory "/home/vagrant/">
	Options Indexes FollowSymLinks
    AllowOverride None
	Require all granted
</Directory>

<VirtualHost *:80>
    DocumentRoot /home/vagrant/${APP_DOMAIN}/current/public

    ErrorLog /home/vagrant/logs/apache/error.log
    CustomLog /home/vagrant/logs/apache/access.log combined
    LogLevel warn

    ServerSignature On

    ServerName ${APP_DOMAIN}
</VirtualHost>

<VirtualHost *:1234>
    DocumentRoot /home/vagrant/phpmyadmin
    ServerName ${APP_DOMAIN}
</VirtualHost>
EOF

# Enable the new site config
sudo a2dissite 000-default.conf
sudo a2ensite default.conf

# Add custom port for PHPmyAdmin
sudo echo 'Listen 1234' >> /etc/apache2/ports.conf

# Apache restart
sudo service apache2 restart

# Install Composer
curl -s https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer

# Install wp-cli
wget -nv https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
sudo chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

# Databases
mysql -uroot -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION; FLUSH PRIVILEGES;"
mysql -uroot -proot -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# WP Salts
saltfile="/home/vagrant/${APP_DOMAIN}/current/config/secrets/wp-salts.php"
if [ -f "$saltfile" ]
then
    echo "Salts found, no need to create new ones, skipping…"
else
    echo "Salts not found, creating new ones from https://api.wordpress.org/secret-key/1.1/salt…"
    echo '<?php' > $saltfile && curl https://api.wordpress.org/secret-key/1.1/salt >> $saltfile
fi
