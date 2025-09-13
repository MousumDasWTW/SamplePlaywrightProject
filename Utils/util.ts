export class util
{
    private static data: string = '';

    static setData(value: any): void
    {
        this.data = value;
        //console.log('Data set to :'+`${this.data}`);
        console.log('Data set to :'+this.data);
    }

    static getData(): string
    {
        //console.log('Data retrieved :'+`${this.data}`);
        console.log('Data retrieved :'+this.data);
        return this.data;
    }
}