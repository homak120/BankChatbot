#!/bin/bash

# Directories
src_dir="src"
dist_dir="dist"
output_file="$dist_dir/combined.js"

# Create dist directory if it doesn't exist
if [ ! -d "$dist_dir" ]; then
    mkdir -p "$dist_dir"
fi

# Check if src directory exists
if [ ! -d "$src_dir" ]; then
    echo "Source directory '$src_dir' does not exist."
    exit 1
fi

# Remove existing output file if it exists
if [ -f "$output_file" ]; then
    rm "$output_file"
fi

# Concatenate all .js files from src_dir into output_file
for file in "$src_dir"/*.js; do
    if [ -f "$file" ]; then
        echo "Adding $file to $output_file"
        cat "$file" >> "$output_file"
        echo -e "\n" >> "$output_file"  # Add a newline for separation
    else
        echo "No JavaScript files found in '$src_dir'."
        exit 1
    fi
done

echo "All JavaScript files have been concatenated into '$output_file'."
