echo("----------user registration---------")
echo("registering battery cell manufacturer")
node ./token_trace_cli/index.js change_account --accountIndex=0
node ./token_trace_cli/index.js user register --userId=Battery_Cell_Manufacturer
echo("registering battery module assembler")
node ./token_trace_cli/index.js change_account --accountIndex=1
node ./token_trace_cli/index.js user register --userId=Battery_Module_Assembler
echo("registering battery pack producer")
node ./token_trace_cli/index.js change_account --accountIndex=2
node ./token_trace_cli/index.js user register --userId=Battery_Pack_Producer
echo("registering logistics partner 1")
node ./token_trace_cli/index.js change_account --accountIndex=3
node ./token_trace_cli/index.js user register --userId=Logistics_1
echo("registering logistics partner 2")
node ./token_trace_cli/index.js change_account --accountIndex=4
node ./token_trace_cli/index.js user register --userId=Logistics_2
echo("registering car manufacturer")
node ./token_trace_cli/index.js change_account --accountIndex=5
node ./token_trace_cli/index.js user register --userId=Car_Manufacturer
echo("registering recycler")
node ./token_trace_cli/index.js change_account --accountIndex=6
node ./token_trace_cli/index.js user register --userId=Recycler







node ./token_trace_cli/index.js change_account --accountIndex=0

echo("")
echo("------------ factory & product registration --------------")
echo("registering battery cell manufacturing factory")
node ./token_trace_cli/index.js change_account --accountIndex=0
node ./token_trace_cli/index.js factory register --factoryId=Battery_Cell_Manufacturing_Factory
echo("      Creating token for battery cell")
node ./token_trace_cli/index.js factory create_token --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell
echo("registering battery module assembler site")
node ./token_trace_cli/index.js change_account --accountIndex=1
node ./token_trace_cli/index.js factory register --factoryId=Battery_Module_Assembler_Site
echo("      Creating token for battery module")
node ./token_trace_cli/index.js factory create_token --factoryId=Battery_Module_Assembler_Site --tokenName=Battery_Module
echo("registering battery pack producer factory")
node ./token_trace_cli/index.js change_account --accountIndex=2
node ./token_trace_cli/index.js factory register --factoryId=Battery_Pack_Producer_Factory
echo("      Creating token for battery pack")
node ./token_trace_cli/index.js factory create_token --factoryId=Battery_Pack_Producer_Factory --tokenName=Battery_Pack
echo("registering car manufacturer factory")
node ./token_trace_cli/index.js change_account --accountIndex=5
node ./token_trace_cli/index.js factory register --factoryId=Car_Manufacturer_factory
echo("      Creating token for a car")
node ./token_trace_cli/index.js factory create_token --factoryId=Car_Manufacturer_factory --tokenName=Car
echo("registering recycler")
node ./token_trace_cli/index.js change_account --accountIndex=6
node ./token_trace_cli/index.js factory register --factoryId=Recycler_site
echo("      Creating token for lithium")
node ./token_trace_cli/index.js factory create_token --factoryId=Recycler_site --tokenName=Lithium
echo("      Creating token for cobalt")
node ./token_trace_cli/index.js factory create_token --factoryId=Recycler_site --tokenName=Cobalt
echo("      Creating token for nickle")
node ./token_trace_cli/index.js factory create_token --factoryId=Recycler_site --tokenName=Nickle
echo("      Creating token for copper")
node ./token_trace_cli/index.js factory create_token --factoryId=Recycler_site --tokenName=Copper








node ./token_trace_cli/index.js change_account --accountIndex=0

echo("")
echo("------------ Manufacturing battery cell --------------")
node ./token_trace_cli/index.js mint single --userId=Battery_Cell_Manufacturer --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell --metadata=Battery_Cell_ID_0
node ./token_trace_cli/index.js mint single --userId=Battery_Cell_Manufacturer --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell --metadata=Battery_Cell_ID_1
node ./token_trace_cli/index.js mint single --userId=Battery_Cell_Manufacturer --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell --metadata=Battery_Cell_ID_2
node ./token_trace_cli/index.js mint single --userId=Battery_Cell_Manufacturer --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell --metadata=Battery_Cell_ID_3
node ./token_trace_cli/index.js mint single --userId=Battery_Cell_Manufacturer --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell --metadata=Battery_Cell_ID_4
node ./token_trace_cli/index.js mint single --userId=Battery_Cell_Manufacturer --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell --metadata=Battery_Cell_ID_5
node ./token_trace_cli/index.js mint single --userId=Battery_Cell_Manufacturer --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell --metadata=Battery_Cell_ID_6
node ./token_trace_cli/index.js mint single --userId=Battery_Cell_Manufacturer --factoryId=Battery_Cell_Manufacturing_Factory --tokenName=Battery_Cell --metadata=Battery_Cell_ID_7



echo("")
echo("------------ Transfering battery cells to logistics partner 1 --------------")
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=0 --toUser=Logistics_1 --metadata=transfer_from_Battery_Cell_Manufacturer_to_Logistics_1
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=1 --toUser=Logistics_1 --metadata=transfer_from_Battery_Cell_Manufacturer_to_Logistics_1
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=2 --toUser=Logistics_1 --metadata=transfer_from_Battery_Cell_Manufacturer_to_Logistics_1
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=3 --toUser=Logistics_1 --metadata=transfer_from_Battery_Cell_Manufacturer_to_Logistics_1
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=4 --toUser=Logistics_1 --metadata=transfer_from_Battery_Cell_Manufacturer_to_Logistics_1
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=5 --toUser=Logistics_1 --metadata=transfer_from_Battery_Cell_Manufacturer_to_Logistics_1
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=6 --toUser=Logistics_1 --metadata=transfer_from_Battery_Cell_Manufacturer_to_Logistics_1
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=7 --toUser=Logistics_1 --metadata=transfer_from_Battery_Cell_Manufacturer_to_Logistics_1



node ./token_trace_cli/index.js change_account --accountIndex=3
echo("")
echo("------------ Delivering battery cells to battery module assembler --------------")
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=0 --toUser=Battery_Module_Assembler --metadata=transfer_from_Logistics_1_to_Battery_Module_Assembler
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=1 --toUser=Battery_Module_Assembler --metadata=transfer_from_Logistics_1_to_Battery_Module_Assembler
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=2 --toUser=Battery_Module_Assembler --metadata=transfer_from_Logistics_1_to_Battery_Module_Assembler
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=3 --toUser=Battery_Module_Assembler --metadata=transfer_from_Logistics_1_to_Battery_Module_Assembler
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=4 --toUser=Battery_Module_Assembler --metadata=transfer_from_Logistics_1_to_Battery_Module_Assembler
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=5 --toUser=Battery_Module_Assembler --metadata=transfer_from_Logistics_1_to_Battery_Module_Assembler
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=6 --toUser=Battery_Module_Assembler --metadata=transfer_from_Logistics_1_to_Battery_Module_Assembler
node ./token_trace_cli/index.js transfer --tokenName=Battery_Cell --tokenId=7 --toUser=Battery_Module_Assembler --metadata=transfer_from_Logistics_1_to_Battery_Module_Assembler


node ./token_trace_cli/index.js change_account --accountIndex=1
echo("")
echo("------------ Assembling battery module --------------")
node ./token_trace_cli/index.js mint multi --userId=Battery_Module_Assembler --factoryId=Battery_Module_Assembler_Site --tokenName=Battery_Module --rNames=[Battery_Cell,Battery_Cell,Battery_Cell,Battery_Cell] --rIds=[0,1,2,3] --metadata=Battery_Module_0
node ./token_trace_cli/index.js mint multi --userId=Battery_Module_Assembler --factoryId=Battery_Module_Assembler_Site --tokenName=Battery_Module --rNames=[Battery_Cell,Battery_Cell,Battery_Cell,Battery_Cell] --rIds=[4,5,6,7] --metadata=Battery_Module_1

echo("")
echo("------------ Transfering battery module to logistics partner 2 --------------")
node ./token_trace_cli/index.js transfer --tokenName=Battery_Module --tokenId=0 --toUser=Logistics_2 --metadata=transfer_from_Battery_Module_Assembler_to_Logistics_2
node ./token_trace_cli/index.js transfer --tokenName=Battery_Module --tokenId=1 --toUser=Logistics_2 --metadata=transfer_from_Battery_Module_Assembler_to_Logistics_2

node ./token_trace_cli/index.js change_account --accountIndex=4
echo("")
echo("------------ Delivering battery modules to battery pack assembler --------------")
node ./token_trace_cli/index.js transfer --tokenName=Battery_Module --tokenId=0 --toUser=Battery_Pack_Producer --metadata=transfer_from_Logistics_2_to_Battery_Pack_Producer
node ./token_trace_cli/index.js transfer --tokenName=Battery_Module --tokenId=1 --toUser=Battery_Pack_Producer --metadata=transfer_from_Logistics_2_to_Battery_Pack_Producer


node ./token_trace_cli/index.js change_account --accountIndex=2
echo("")
echo("------------ Assembling battery pack --------------")
node ./token_trace_cli/index.js mint multi --userId=Battery_Pack_Producer --factoryId=Battery_Pack_Producer_Factory --tokenName=Battery_Pack --rNames=[Battery_Module,Battery_Module] --rIds=[0,1] --metadata=Battery_Pack_0

echo("")
echo("------------ Delivering battery pack to car manufacturer --------------")
node ./token_trace_cli/index.js transfer --tokenName=Battery_Pack --tokenId=0 --toUser=Car_Manufacturer --metadata=transfer_from_Battery_Pack_Producer_to_Car_Manufacturer

node ./token_trace_cli/index.js change_account --accountIndex=5
echo("")
echo("------------ Delivering battery pack to recycler after end-of-life --------------")
node ./token_trace_cli/index.js transfer --tokenName=Battery_Pack --tokenId=0 --toUser=Recycler --metadata=transfer_from_Car_Manufacturer_to_Recycler


node ./token_trace_cli/index.js change_account --accountIndex=6
echo("")
echo("------------ Recycling --------------")
node ./token_trace_cli/index.js mint multi --userId=Recycler --factoryId=Recycler_site --tokenName=Lithium --rNames=[Battery_Pack] --rIds=[0] --metadata=Lithium_0
node ./token_trace_cli/index.js mint multi --userId=Recycler --factoryId=Recycler_site --tokenName=Cobalt --rNames=[Battery_Pack] --rIds=[0] --metadata=Cobalt_0
node ./token_trace_cli/index.js mint multi --userId=Recycler --factoryId=Recycler_site --tokenName=Copper --rNames=[Battery_Pack] --rIds=[0] --metadata=Copper_0
node ./token_trace_cli/index.js mint multi --userId=Recycler --factoryId=Recycler_site --tokenName=Nickle --rNames=[Battery_Pack] --rIds=[0] --metadata=Nickle_0



echo("trace............")
node ./token_trace_cli/index.js trace --tokenName=Lithium --tokenId=0
node ./token_trace_cli/index.js trace --tokenName=Cobalt --tokenId=0 

