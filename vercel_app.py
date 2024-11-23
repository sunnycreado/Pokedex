from flask import Flask
from app import app as flask_app
import os

# Configure environment for minimal footprint
os.environ['SKLEARN_ALLOW_DEPRECATED_SKLEARN_PACKAGE_INSTALL'] = 'True'
os.environ['JOBLIB_MULTIPROCESSING'] = '0'

app = flask_app

if __name__ == '__main__':
    app.run() 