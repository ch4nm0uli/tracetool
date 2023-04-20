echo("register user")
node ./token_trace_cli/index.js change_account --accountIndex=0
node ./token_trace_cli/index.js user register --userId=user_1
node ./token_trace_cli/index.js change_account --accountIndex=1
node ./token_trace_cli/index.js user register --userId=user_2
node ./token_trace_cli/index.js change_account --accountIndex=0

echo("register factory")
node ./token_trace_cli/index.js factory register --factoryId=factory_1

echo("create tokens")
node ./token_trace_cli/index.js factory create_token --factoryId=factory_1 --tokenName=token_1
node ./token_trace_cli/index.js factory create_token --factoryId=factory_1 --tokenName=token_2
node ./token_trace_cli/index.js factory create_token --factoryId=factory_1 --tokenName=token_3
node ./token_trace_cli/index.js factory create_token --factoryId=factory_1 --tokenName=token_4

echo("single mint")
node ./token_trace_cli/index.js mint single --userId=user_1 --factoryId=factory_1 --tokenName=token_1 --metadata=token_1_mint_1
node ./token_trace_cli/index.js mint single --userId=user_1 --factoryId=factory_1 --tokenName=token_2 --metadata=token_2_mint_1
node ./token_trace_cli/index.js mint single --userId=user_1 --factoryId=factory_1 --tokenName=token_2 --metadata=token_2_mint_2


echo("multi mint")
node ./token_trace_cli/index.js mint multi --userId=user_1 --factoryId=factory_1 --tokenName=token_3 --rNames=[token_1,token_2] --rIds=[0,0] --metadata=token_3_mint_1
node ./token_trace_cli/index.js mint multi --userId=user_1 --factoryId=factory_1 --tokenName=token_4 --rNames=[token_2,token_3] --rIds=[1,0] --metadata=token_4_mint_1

echo("transfer from user_1 to user_2")
node ./token_trace_cli/index.js transfer --tokenName=token_3 --tokenId=0 --toUser=user_2 --metadata=transfer_from_user_1_to_user_2

echo("trace............")
node ./token_trace_cli/index.js trace --tokenName=token_3 --tokenId=0 
node ./token_trace_cli/index.js trace --tokenName=token_4 --tokenId=0 

