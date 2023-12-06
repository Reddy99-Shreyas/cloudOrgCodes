import { LightningElement, track } from 'lwc';


export default class LookUpCmp extends LightningElement {
    @track labelItems = [
        {
            label: 'Salesforce LWC'
        },
        {
            label: 'Aura Lightning'
        },
        {
            label: 'Integration'
        },
        {
            label: 'W3web Tutorial'
        }
    ];

    removePillItem(event) {

        const pillIndex = event.detail.index ? event.detail.index : event.detail.name;

        const itempill = this.labelItems;
        itempill.splice(pillIndex, 1);
        this.labelItems = [...itempill];
        console.log(pillIndex, this.labelItems);
    }

}