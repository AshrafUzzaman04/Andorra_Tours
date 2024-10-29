<?php

namespace App\Helpers;

class Translation
{
    /**
     * Add or update translations for all text fields dynamically.
     *
     * @param array $data The data array containing fields to translate.
     */
    public static function addOrUpdateTranslations($data)
    {
        $languages = self::getLanguages();
    
        foreach ($languages as $lang) {
            $filePath = base_path("lang/{$lang}/translations.json"); // Use base_path instead of resource_path
    
            // Load existing translations
            $existingTranslations = self::loadTranslations($filePath);
    
            // Filter to only get string values from the input data
            $fieldsToTranslate = array_filter($data, function ($value) {
                return is_string($value); // Only include string values
            });
    
            foreach ($fieldsToTranslate as $value) {
                $shouldAdd = true;
    
                // Check against existing values
                foreach ($existingTranslations as $existingValue => $existingKey) {
                    // Calculate similarity
                    $similarity = 0;
                    similar_text($existingValue, $value, $similarity);
    
                    // If similarity is 90% or more, update the key
                    if ($similarity >= 90) {
                        // Update the existing key to the new value
                        if ($existingKey !== $value) {
                            // Uncomment the next line if you want to update the existing value with the new one
                            // $existingTranslations[$existingValue] = $value; 
                        }
                        $shouldAdd = false; // Mark as not adding
                        break; // No need to check other existing values
                    }
                }
    
                // If no similar existing value was found, add the new value
                if ($shouldAdd) {
                    $existingTranslations[$value] = $value; // Add new translation
                }
            }
    
            // Save the updated translations back to the file
            self::saveTranslations($filePath, $existingTranslations);
        }
    }
    





    /**
     * Delete translations for all text fields dynamically.
     *
     * @param array $data The data array containing fields to delete.
     */
    public static function deleteTranslations($data)
    {
        $languages = self::getLanguages();

        foreach ($languages as $lang) {
            $filePath = base_path("lang/{$lang}/translations.json"); // Use base_path instead of resource_path

            // Load existing translations
            $existingTranslations = self::loadTranslations($filePath);

            // Loop through each field in the data
            foreach ($data as $key => $value) {
                if (is_string($value) && isset($existingTranslations[$value])) {
                    unset($existingTranslations[$value]); // Remove the translation if it exists
                }
            }

            // Save the updated translations
            self::saveTranslations($filePath, $existingTranslations);
        }
    }

    // Private helper methods
    private static function getLanguages()
    {
        $languageDirectories = glob(base_path('lang/*'), GLOB_ONLYDIR); // Use base_path
        return array_map(function ($path) {
            return basename($path);
        }, $languageDirectories);
    }

    private static function loadTranslations($filePath)
    {
        if (file_exists($filePath)) {
            return json_decode(file_get_contents($filePath), true) ?? [];
        }
        return [];
    }

    private static function saveTranslations($filePath, $translations)
    {
        file_put_contents($filePath, json_encode($translations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
}
