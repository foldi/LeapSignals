Foothold
======

A template for creating web apps with an ant-driven build process that includes:

* JS validation via jshint
* JS minification via Closure
* CSS validation vis csslint
* CSS minification
* Documentation via jsDoc
* Unit testing via Jasmine and PhantomJS
* Deployment to development and public environments

Clone the repo and run 'ant' in the root folder. You should see the development build run. Built files are copied to the 'dev' folder.

Run 'ant build.release' to build and test minified build files. The release build files are copied to the 'public' folder.

Build your classes in the 'src' folder. There are currently two example classes, dog.js and cat.js. These classes are concatenated and accessible via a namespace defined as the 'buildName' in build.properties.

Change properties in the build.properties files as necessary. The .gitignore file currently ignores the 'docs' and 'public' folders.
