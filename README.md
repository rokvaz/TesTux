# TesTux
kodoBezdziones komandos projektas.
KTU


# Set-up
## Server side setup


First pull the project
```git clone https://github.com/rokvaz/TesTux```
<br>
install nvm (if not present)
```curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash ```
<br>
setup nvm
```nvm install --lts```
```nvm use 20.11.1```
<br>
<br>
update npm just since sometimes its not up to date:
```npm install -g npm```
<br>
enter frontend folder and install next
```npm install next@latest```
```npm install react@latest```
```npm install react-dom@latest```
```npm install mysql2 dotenv```
<br>
update ```env.local.example``` file with your mysql server logins and rename it to ```env.local``` 
<br>
inside frontend folder run:
```npm run build```
and
```npm run start```
<br>
<br>
The frontend will be running at port 3000

# Set-up
## Tools

Download the latest version of nvm-windows (Node version manager for windows) from [here](https://github.com/coreybutler/nvm-windows/releases)
I recommend installing "nvm-setup.exe". After that don't forget to restart your terminal window.

Now download the latest version of node. To do that open a terminal window and type
```nvm install --lts```
After installing you will probably get promted to set installed version as default. To do that type the following
```nvm use 20.11.1```

After this commands npx, npm, node and nvm should be available in your terminal.

## How to pull the project
Open a folder where you want the project located. Make sure the path doesn't include Lithuanian letters or spaces.
If you're cloning the project FOR THE FIRST TIME use:
```git clone https://github.com/rokvaz/TesTux.git```

Updating the project to sync any changes, go into the project directory [path to folder]/TesTux and run this command:
```git pull```

To manage project via git on your own machine use commands:
```
git add [changed file name]
git commit -m "[message text for commit e.g. create quiz parsing functionality]"
git push
```

## Running the project locally
Go into either the frontend or backend folder.
Before running frontend you have to build the app. To do so run:
```npm run build```
And launch the app with
```npm run start```
Close the app with
```ctrl + C```

If you're getting errors like "next is not recognized as an internal or external command, ..." run this command to install the
necessary tools:
```
npm install react react-dom next
```


