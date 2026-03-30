import os
import glob
import re

directory = r"d:\March Websites\food_waste_reduction_app"
html_files = glob.glob(os.path.join(directory, "*.html"))

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add Dashboard link after Contact link
    # Using regex to match <a href="contact.html" class="...">Contact</a> 
    # to account for variations like active class
    original_contact_regex = r'(<a href="contact\.html"[^>]*>Contact</a>)'
    replacement_dashboard = r'\1\n                <a href="dashboard.html" class="nav-link">Dashboard</a>'
    
    if '<a href="dashboard.html" class="nav-link">Dashboard</a>' not in content:
        content = re.sub(original_contact_regex, replacement_dashboard, content)
    
    # 2. Remove Dashboard button from nav-actions
    button_regex = r'\s*<a href="dashboard\.html" class="btn btn-primary">Dashboard</a>'
    content = re.sub(button_regex, '', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Processed {len(html_files)} files.")
