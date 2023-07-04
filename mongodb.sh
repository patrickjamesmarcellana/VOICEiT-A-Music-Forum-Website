echo "test only this will lose data after reboot"
mkdir /tmp/testdb
sudo mongod --dbpath /tmp/testdb 
