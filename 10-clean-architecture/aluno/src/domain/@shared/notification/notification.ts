export type NotificationError = {
    message: string;
    context: string;
}

export default class Notification {

    private errors: NotificationError[] = [];    

    addError(error: NotificationError) {
        this.errors.push(error);
    }
    
    messages(context?: string): string {
        let message = "";
        this.errors.forEach(error => {
            if(context == undefined || context === error.context ) {
                message += `${error.context}: ${error.message},`
            }
        });
        return message;
    }   

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

}