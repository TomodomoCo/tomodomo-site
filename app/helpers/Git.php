<?php

namespace Tomodomo\Helpers;

class Git
{
    /**
     * Get the current active commit hash
     *
     * @return string|null
     */
    public static function getCurrentCommitHash()
    {
        // Path to Capistrano's REVISION file
        $revisionFilePath = ABSPATH . '../../REVISION';

        // Path to the fallback inside the `.git` folder
        $revisionFilePathFallback = sprintf(
            ABSPATH . '../../.git/refs/heads/%s',
            WP_STAGE
        );

        // Try the Capistrano method
        if (is_readable($revisionFilePath)) {
            return file_get_contents($revisionFilePath);
        }

        // Try the Git method
        if (is_readable($revisionFilePathFallback)) {
            return file_get_contents($revisionFilePathFallback);
        }

        // Null if we can't find it via one of those methods
        return null;
    }
}
