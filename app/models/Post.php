<?php

namespace Tomodomo\Models;

class Post extends \Timber\Post
{

    public function excerpt()
    {
        return $this->preview()->read_more(false);
    }
}
