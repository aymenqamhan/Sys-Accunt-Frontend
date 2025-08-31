import os

def print_tree(path, prefix=""):
    try:
        items = os.listdir(path)
    except PermissionError:
        print(prefix + " [صلاحيات غير كافية]")
        return

    items.sort()
    for i, item in enumerate(items):
        full_path = os.path.join(path, item)
        connector = "└── " if i == len(items) - 1 else "├── "
        print(prefix + connector + item)

        if os.path.isdir(full_path):
            extension = "    " if i == len(items) - 1 else "│   "
            print_tree(full_path, prefix + extension)

if __name__ == "__main__":
    folder = input("أدخل مسار المجلد: ").strip()
    if os.path.exists(folder) and os.path.isdir(folder):
        print(folder)
        print_tree(folder)
    else:
        print("❌ المسار غير صحيح أو ليس مجلدًا.")
