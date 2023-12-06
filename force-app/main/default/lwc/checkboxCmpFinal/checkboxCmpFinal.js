import { LightningElement, api, track } from 'lwc';

export default class CheckboxCmpFinal extends LightningElement {

    @track showSalesforceStack = false;
    @track showOracleStack = false;
    @track showSAPStack = false;

    value
    get options() {
        return [
            { label: 'Salesforce', value: 'Salesforce' },
            { label: 'Oracle', value: 'Oracle' },
            { label: 'SAP', value: 'SAP' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        const selectedValue = event.detail.value;

        this.showSalesforceStack = selectedValue.includes('Salesforce');
        this.showOracleStack = selectedValue.includes('Oracle');
        this.showSAPStack = selectedValue.includes('SAP');
    }

    @api salesforcePicklistInput = ["Sales Cloud", "Service Cloud", "Marketing Cloud", "Commerce Cloud", "App Cloud", "Einstein Analytics", "Community Cloud", "IOTCloud", "Force.com", "Apex", "LWC", "Aura", "Salesforce"];
    @api sapPicklistInput = ["ABAP", "SAP", "Hana"];

    @api selectedItems = [];

    @track allValues = []; // this will store end result or selected values from picklist
    @track valuesVal = undefined;
    @track searchTerm = '';
    @track itemcounts = 'None Selected';

    handleSearch(event) {
        this.searchTerm = event.target.value;
    }

    get filteredResults() {
        //copying data from parent component to local variables
        if (this.valuesVal == undefined) {
            this.valuesVal = this.salesforcePicklistInput;
            //below method is used to change the input which we received from parent component
            //we need input in array form, but if it's coming in JSON Object format, then we can use below piece of code to convert object to array
            Object.keys(this.valuesVal).map(profile => {
                this.allValues.push({ Id: profile, Name: this.valuesVal[profile] });
            })

            this.valuesVal = this.allValues.sort(function (a, b) { return a.Id - b.Id });
            this.allValues = [];

            console.log('da ', JSON.stringify(this.valuesVal));
        }

        if (this.valuesVal != null && this.valuesVal.length != 0) {
            if (this.valuesVal) {
                const selectedProfileNames = this.selectedItems.map(profile => profile.Name);
                console.log('selectedProfileNames ', JSON.stringify(selectedProfileNames));
                return this.valuesVal.map(profile => {

                    //below logic is used to show check mark (✓) in dropdown checklist
                    const isChecked = selectedProfileNames.includes(profile.Id);
                    return {
                        ...profile,
                        isChecked
                    };

                }).filter(profile =>
                    profile.Id.toLowerCase().includes(this.searchTerm.toLowerCase())
                ).slice(0, 20);
            } else {
                return [];
            }
        }
    }
    
    handleSelection(event) {
        const selectedProfileId = event.target.value;
        const isChecked = event.target.checked;

        //below logic is used to show check mark (✓) in dropdown checklist
        if (isChecked) {
            const selectedProfile = this.valuesVal.find(profile => profile.Id === selectedProfileId);
            if (selectedProfile) {
                this.selectedItems = [...this.selectedItems, selectedProfile];
                this.allValues.push(selectedProfileId);
            }
        } else {
            this.selectedItems = this.selectedItems.filter(profile => profile.Id !== selectedProfileId);
            this.allValues.splice(this.allValues.indexOf(selectedProfileId), 1);
        }
        this.itemcounts = this.selectedItems.length > 0 ? `${this.selectedItems.length} options selected` : 'None Selected';
    }

    //Remove function for lightning pill
    handleRemove(event) {
        const valueRemoved = event.target.name;
        this.selectedItems = this.selectedItems.filter(profile => profile.Id !== valueRemoved);
        this.allValues.splice(this.allValues.indexOf(valueRemoved), 1);
        this.itemcounts = this.selectedItems.length > 0 ? `${this.selectedItems.length} options selected` : 'None Selected';
    }

    selectall(event) {
        event.preventDefault();

        this.selectedItems = this.valuesVal;
        this.itemcounts = this.selectedItems.length + ' options selected';
        this.allValues = [];
    }

    handleclearall(event) {
        event.preventDefault();

        this.selectedItems = [];
        this.allValues = [];
        this.itemcounts = 'None Selected';
        this.searchTerm = '';
    }

    //oracle logic
    @api oraclePicklistInput = ["Java", "SQL", "ERP", "DBA"];

    
}