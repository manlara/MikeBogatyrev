<?php
/**
 * This example shows sending a message using PHP's mail() function.
 */

require '../PHPMailer/PHPMailerAutoload.php';

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// Get the form fields and remove whitespace.
	$name = strip_tags(trim($_POST["name"]));
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	$message = trim($_POST["message"]);

	// Check that data was sent to the mailer.
	if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
	    // Set a 400 (bad request) response code and exit.
	    http_response_code(400);
	    echo "Oops! There was a problem with your submission. Please complete the form and try again.";
	    exit;
	}

	// Set the recipient email address.
	// FIXME: Update this to your desired email address.
	$recipient = "mikebogatyrev82@gmail.com";
	//$recipient = "manlara@indiana.edu";

	// Set the email subject.
	$subject = "New contact from $name";

	// Build the email content.
	$email_content = "Name: $name\n";
	$email_content .= "Email: $email\n\n";
	$email_content .= "Message:\n$message\n";

	//Create a new PHPMailer instance
	$mail = new PHPMailer;
	//Set who the message is to be sent from
	$mail->setFrom('from@example.com', "$name");
	//Set an alternative reply-to address
	$mail->addReplyTo("$email", "$name");
	//Set who the message is to be sent to
	$mail->addAddress("$recipient", 'Mike Bogatyrev');
	//Set the subject line
	$mail->Subject = "$subject";
	//Replace the plain text body with one created manually
	$mail->AltBody = "$email_content";

	//send the message, check for errors
	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	    echo "Thank You! Your message has been sent.";
	}
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
