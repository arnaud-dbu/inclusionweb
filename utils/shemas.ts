import * as yup from "yup";

export const NameSchema = yup.object().shape({
	firstName: yup.string().required("Voornaam is verplicht"),
	lastName: yup.string().required("Achternaam is verplicht"),
});

export const ValidatePasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required("Paswoord is verplicht")
		.min(6, "Paswoord moet min 6 karakters bevatten"),
	validatePassword: yup
		.string()
		.required("Paswoord is verplicht")
		.oneOf([yup.ref("password"), null], "Paswoord komt niet overeen"),
});

export const EmailSchema = yup.object().shape({
	email: yup.string().email("Voer een geldig e-mailadres in").required("E-mail is verplicht"),
	password: yup
		.string()
		.max(32, "Maximale wachtwoordlengte is 32")
		.required("Wachtwoord is verplicht"),
});
