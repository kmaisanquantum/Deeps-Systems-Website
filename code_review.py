import os

files_to_review = ["components/Footer.tsx"]

print("CODE REVIEW REQUEST:")
for file_path in files_to_review:
    print(f"\n--- {file_path} ---")
    with open(file_path, 'r') as f:
        print(f.read())
