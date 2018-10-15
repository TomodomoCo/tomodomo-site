<?php

namespace Tomodomo\Models;

class Post extends \Timber\Post
{
    /**
     * @return string
     */
    public function excerpt()
    {
        return $this->preview()->read_more(false);
    }
}
