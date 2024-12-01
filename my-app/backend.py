from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import tempfile
import time
from threading import Timer

app = Flask(__name__)

# Temporary directory for storing files
temp_dir = tempfile.gettempdir()

# Function to remove files after a delay (2 seconds)
def delete_files(file_paths):
    time.sleep(2)  # Delay for 2 seconds
    for path in file_paths:
        if os.path.exists(path):
            os.remove(path)
            print(f"Deleted: {path}")

@app.route("/upload", methods=["POST"])
def upload_files():
    # Retrieve files from the frontend
    assignment_files = request.files.getlist("assignmentFile")  # Use assignmentFile as key
    criteria_file = request.files.get("criteriaFile")

    if not assignment_files or not criteria_file:
        return jsonify({"error": "Both criteria and assignment files are required"}), 400

    # Save criteria file
    criteria_file_path = os.path.join(temp_dir, secure_filename(criteria_file.filename))
    criteria_file.save(criteria_file_path)

    # Save each assignment file and collect their paths
    assignment_file_paths = []
    for assignment_file in assignment_files:
        path = os.path.join(temp_dir, secure_filename(assignment_file.filename))
        assignment_file.save(path)
        assignment_file_paths.append(path)

    # Start a background thread to delete the files after 2 seconds
    Timer(2, delete_files, [assignment_file_paths + [criteria_file_path]]).start()

    # Return success message
    return jsonify({"message": "Files successfully uploaded. They will be deleted in 2 seconds."})

    
if __name__ == "__main__":
    app.run(debug=True)
