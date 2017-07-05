call coffee -o apilib -c api/lib/src
call coffee -o api/error -c api/error/src
call coffee -o api/message -c api/message/src
call coffee -o . storm.coffee
node storm.js