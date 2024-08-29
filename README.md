# Tags Control

![](https://github.com/novalogica/pcf-tags/blob/main/screenshots/tag_example.png)


## Usage

To use this control, you can add the custom control to a SingleLine.Text field.

Once the control is added, you need to provide the following fields:

| Property | Description    |
| :---:   | :---: |
| Tag Limit | Can be defined a tag limit for each record  |
| Tag Background Color | Background color for the tag container   |



### Deploy
In order to deploy to your environment you'll need to run this commands: 
   #### 1. Create your authentication profile using the pac auth create command
      pac auth create --url https://xyz.crm.dynamics.com 

   #### 2. If you have previously created an authentication profile, you can view all the existing profiles using the pac auth list command
      pac auth list
   #### 3. To switch between the previously created authentication profiles, use the pac auth select command:
      pac auth select --index <index of the active profile>
   #### 4. Ensure that you have a valid connection and push the component
      pac pcf push -pp <your publisher prefix>
   
