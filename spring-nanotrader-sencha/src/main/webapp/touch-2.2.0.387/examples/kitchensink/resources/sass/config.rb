# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)
st_dir = File.join(dir, '..', '..', '..', '..', 'resources', 'themes')

# Load the sencha-touch framework automatically.
load st_dir

# Compass configurations
sass_path = dir
css_path = File.join(dir, "..", "css")

# Require any additional compass plugins here.
fonts_path = File.join(st_dir, 'fonts/')
images_dir = File.join(dir, "..", "images")
output_style = :expanded
environment = :development
