import os

old_path = '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'
new_path = '<path d="M3 11c0 5 4 9 9 9s9-4 9-9"></path>\n                    <path d="M12 11V3"></path>\n                    <path d="M12 7c2 0 4-1 5-3"></path>\n                    <path d="M12 7c-2 0-4-1-5-3"></path>'

files = [
    "404.html", "about.html", "blog-details-2.html", "blog-details-3.html", 
    "blog-details-4.html", "blog-details-5.html", "blog-details-6.html", 
    "blog-details.html", "blog.html", "coming-soon.html", "contact.html", 
    "dashboard.html", "home-2.html", "index.html", "login.html", 
    "pricing.html", "register.html", "service-details.html", "services.html"
]

for filename in files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content.replace(old_path, new_path)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"File {filename} not found")
