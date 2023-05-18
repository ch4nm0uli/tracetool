
1) Procurement of Raw Material:
{
  "type": "object",
  "properties": {
    "rawMaterialId": {
      "type": "string",
      "description": "Unique identifier for the raw material"
    },
    "supplier": {
      "type": "string",
      "description": "Supplier of the raw material"
    },
    "quantity": {
      "type": "number",
      "description": "Quantity of the raw material"
    },
    "date": {
      "type": "string",
      "format": "date",
      "description": "Date of procurement"
    },
    "location": {
      "type": "string",
      "description": "Location of the procurement"
    },
    "certificate": {
      "type": "string",
      "description": "Certificate or documentation related to the raw material"
    }
  },
  "required": ["rawMaterialId", "supplier", "quantity", "date", "location"]
}

2) Battery Cell Production:
{
  "type": "object",
  "properties": {
    "cellId": {
      "type": "string",
      "description": "Unique identifier for the battery cell"
    },
    "cellManufacturer": {
      "type": "string",
      "description": "Manufacturer of the battery cell"
    },
    "productionDate": {
      "type": "string",
      "format": "date",
      "description": "Date of battery cell production"
    },
    "batchNumber": {
      "type": "string",
      "description": "Batch number or code for tracking purposes"
    },
    "qualityControl": {
      "type": "string",
      "description": "Quality control information or test results"
    }
  },
  "required": ["cellId", "cellManufacturer", "productionDate", "batchNumber"]
}


3) Module Assembly with BMS (Battery Management System):
{
  "type": "object",
  "properties": {
    "moduleId": {
      "type": "string",
      "description": "Unique identifier for the battery module"
    },
    "assembler": {
      "type": "string",
      "description": "Assembler of the battery module"
    },
    "assemblyDate": {
      "type": "string",
      "format": "date",
      "description": "Date of module assembly"
    },
    "bmsVersion": {
      "type": "string",
      "description": "Version or information of the Battery Management System (BMS)"
    }
  },
  "required": ["moduleId", "assembler", "assemblyDate", "bmsVersion"]
}

4) Battery Pack Production:
{
  "type": "object",
  "properties": {
    "packId": {
      "type": "string",
      "description": "Unique identifier for the battery pack"
    },
    "packProducer": {
      "type": "string",
      "description": "Producer of the battery pack"
    },
    "productionDate": {
      "type": "string",
      "format": "date",
      "description": "Date of battery pack production"
    },
    "moduleIds": {
      "type": "array",
      "description": "Array of module IDs used in the battery pack",
      "items": {
        "type": "string"
      }
    },
    "packCapacity": {
      "type": "number",
      "description": "Capacity of the battery pack in ampere-hours (Ah)"
    },
    "packVoltage": {
      "type": "number",
      "description": "Voltage of the battery pack in volts (V)"
    },
    "packWeight": {
      "type": "number",
      "description": "Weight of the battery pack in kilograms (kg)"
    },
    "certificate": {
      "type": "string",
      "description": "Certificate or documentation related to the battery pack"
    }
  },
  "required": ["packId", "packProducer", "productionDate", "moduleIds", "packCapacity", "packVoltage", "packWeight"]
}


5) 	Car Assembly:
{
  "type": "object",
  "properties": {
    "carId": {
      "type": "string",
      "description": "Unique identifier for the car"
    },
    "carManufacturer": {
      "type": "string",
      "description": "Manufacturer of the car"
    },
    "assemblyDate": {
      "type": "string",
      "format": "date",
      "description": "Date of car assembly"
    },
    "model": {
      "type": "string",
      "description": "Model or type of the car"
    }
  },
  "required": ["carId", "carManufacturer", "assemblyDate", "model"]
}


6) Recycle after End-of-Life:

{
  "type": "object",
  "properties": {
    "batteryId": {
      "type": "string",
      "description": "Unique identifier for the battery"
    },
    "recycler": {
      "type": "string",
      "description": "Battery recycler"
    },
    "recycleDate": {
      "type": "string",
      "format": "date",
      "description": "Date of battery recycling"
    },
    "recycleMethod": {
      "type": "string",
      "description": "Method or process used for battery recycling"
    }
  },
  "required": ["batteryId", "recycler", "recycleDate", "recycleMethod"]
}
