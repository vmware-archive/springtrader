# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join(dir, '..', '..', 'touch-2.2.0.387', 'resources', 'themes')

# Compass configurations
sass_path = dir
css_path = File.join(dir, "..", "css")
fonts_path = File.join(dir, '..', '..', 'touch-2.2.0.387', 'resources', 'themes', 'fonts')

# Require any additional compass plugins here.
images_dir = File.join(dir, "..")
# output_style = :compressed
# environment = :production

output_style = :expanded
