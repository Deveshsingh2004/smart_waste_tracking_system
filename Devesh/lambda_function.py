from twilio.rest import Client
import os
def send_sms(phone_number, message):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=message,
        from_='+15419063455',  # Your Twilio number
        to=phone_number
    )
    print("SMS sent:", message.sid)

def lambda_handler(event, context):
    # phone_number = event['phone']
    # message = event['message']
    phone_number = "+919140231028"
    message = "This is just a test message to check the lambda function integration with twilio."
    send_sms(phone_number, message)
    print("This is working")
    return {"status": "SMS sent"}
