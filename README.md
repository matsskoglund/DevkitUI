# DevkitUI
The GUI for Devkit in Angular

### Getting started on Mac
```
dev>
dev> git clone https://github.com/matsskoglund/DevkitUI.git
dev> cd DevkitUI
DevkitUI> npm install
DevkitUI> ng serve
```
Then navigate to http://localhost:4200


### Configuring endpoints in a Codebuild build step
In buildspec.yml the following command
```
sed -i "s/localhost/$API_URL/g" src/environments/environment.prod.ts
```
Replaces the `localhost:5000` part of the line 
`apiUrl: 'http://localhost:5000/` with the value in the environment variable `$API_URL`

For example if `$API_URL` contains the value `mybackend.com:1234/` the resulting string will be `apiUrl: 'http://mybackend.com:1234/`.

The environment variable `$API_URL` is configured in AWS CodeBuild under *Advanced settings* and *Environment variables* and is stored as a secret in the AWS parameter store.



