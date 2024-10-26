import os
import yaml
import re
import sys  # Import sys to use exit function

# Directory containing data files
DATA_DIR = "src/data"

# Allowed build frameworks
ALLOWED_BUILD_WITH = {
    'Next.js',
    'React',
    'Vue',
    'Nuxt',
    'Svelte',
    'Remix',
    'Svelte Kit',
    'Solid.JS',
    'Astro',
    'Qwik'
}

# Function to validate YAML syntax
def is_valid_yaml(file_path):
    try:
        with open(file_path, 'r') as file:
            yaml_content = yaml.safe_load(file)
            # Validate link
            if 'link' in yaml_content:
                if not is_valid_link(yaml_content['link']):
                    print(f"❌ Invalid link in: {file_path} - {yaml_content['link']}")
                    return False
            
            # Validate build-with (single value)
            if 'build-with' in yaml_content:
                if not validate_build_with(yaml_content['build-with'], file_path):
                    return False

            return True
    except yaml.YAMLError as e:
        print(f"❌ Invalid YAML syntax in: {file_path}\nError: {e}")
        return False

# Function to validate URL
def is_valid_link(link):
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|'  # ...or ipv4
        r'\[?[A-F0-9]*:[A-F0-9:]+\]?)'  # ...or ipv6
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, link) is not None

# Function to validate build-with field
def validate_build_with(build_with, file_path):
    # Validate single entry
    if build_with not in ALLOWED_BUILD_WITH:
        print(f"❌ Invalid build-with entry in {file_path}: {build_with}")
        return False
    return True

# Function to check image size
def is_image_size_valid(file_path, max_size_mb):
    max_size_bytes = max_size_mb * 1024 * 1024  # Convert MB to Bytes
    return os.path.getsize(file_path) <= max_size_bytes

# Variable to track if there are any errors
has_errors = False

# Iterate over all .yml files in the data directory
for yml_file in os.listdir(DATA_DIR):
    if yml_file.endswith(".yml"):
        # Extract base name without extension
        base_name = os.path.splitext(yml_file)[0]
        
        # Define corresponding .png file path
        png_file = f"{base_name}.png"
        png_path = os.path.join(DATA_DIR, png_file)
        
        # Check if the .png file exists
        if os.path.isfile(png_path):
            # Check if the image size is valid
            if not is_image_size_valid(png_path, 8):  # Check if size is less than or equal to 8 MB
                print(f"❌ Invalid image size for: {png_file}")
                has_errors = True
        else:
            print(f"❌ Missing .png for: {yml_file}")
            has_errors = True
        
        # Validate YAML syntax
        yml_path = os.path.join(DATA_DIR, yml_file)
        if not is_valid_yaml(yml_path):
            has_errors = True

if has_errors:
    sys.exit(1)
    
print("Validated Successfully")
