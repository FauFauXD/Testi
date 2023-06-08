import { OPENAI_KEY } from './secrets.js';
import openai from 'https://cdn.jsdelivr.net/npm/openai@3.2.1/+esm'
const { Configuration, OpenAIApi } = openai
const configuration = new Configuration({
	apiKey: OPENAI_KEY,
});
const openAIApi = new OpenAIApi(configuration);
	
	const form = document.querySelector('form');
	const output1 = document.querySelector('#output1');
	const output2 = document.querySelector('#output2');
	const output3 = document.querySelector('#output3');
	const output4 = document.querySelector('#output4');
	const output5 = document.querySelector('#output5');
	const output6 = document.querySelector('#output6');
	document.getElementById('errorText').innerHTML = '';
	let step;
	let messages = '';
	let oldText = '';
	let outputText = '';
	let index = 0;
	let text = [];
	let completion;
    let promptName1 = '', promptName2 = '', promptRelationship = '';

    document.addEventListener('sectionChange', async function() {

        step = activeIndex;
        

		switch(step){
			case 0:     //--- GET FORM INFORMARTION ---//
                        promptName1 = document.querySelector('#name1').value;
		                promptName2 = document.querySelector('#name2').value;
		                promptRelationship = document.querySelector('#relationship').value;
						const promptNegStory = document.querySelector('#neg_Story').value;
						const prompt = "Name Autor: " + promptName1 + ", Name der anderen Person: " + promptName2 + ", Unser Beziehungsstatus: " + promptRelationship + ", Das hat mich verletzt: " + promptNegStory;		
						
						document.getElementById("nameText").innerHTML = promptName2;
                        
                        //--- CHAT GPT REQUEST ---//
						messages = [
							{role: "system", content: 	"Du hilfst mir einen negativen Tagebucheintrag über " + promptName2 + " zu erstellen. " + 
														"Nutze nur die Information 'Unser Beziehungsstatus' und 'Das hat mich verletzt', ansonsten dichtest oder erfindest du nichts. " +
														"Halte dich kurz, maximal 60 Worte. Nutze kein Datum. Starte mit 'Liebes Tagebuch, '. Mache keinen Abschluss."}
							]
						messages.push({role: "user", content: prompt});

						completion = await openAIApi.createChatCompletion({
							model: "gpt-3.5-turbo",
							messages: messages,
						});
						console.log(completion)
						text[index++] = completion.data.choices[0].message.content;

						document.getElementById("loading1").style.display = "none";

						//--- DIARY TEXT ---//
						outputText = oldText + " " + text[0];
						oldText = outputText;
                        output1.innerHTML = outputText + " " + promptName1;
						messages.push({role: "assistant", content: outputText})
			break;
			case 2: //--- GET FORM INFORMARTION ---//
					const promptObject1 = document.querySelector('#neg_Obj_1').value;
					const promptObjectS1 = document.querySelector('#neg_Obj_1_Story').value;
					const promptO1 = "Alter Text: " + oldText + ", Neues Objekt: " + promptObject1 + ", Geschichte hinter dem Objekt: " + promptObjectS1;

					//--- CHAT GPT REQUEST ---//
					messages = [
						{role: "system", content: 	"Du hilfst mir einen negativen Tagebucheintrag über " + promptName2 + " zu ergänzen. "},
						{role: "user", content: "Der alte Text: " + oldText},
						{role: "assistant", content: "Ergänze den alten Text um folgendes: " +
													"'Objekt' und 'Geschichte hinter dem Objekt'. " +
													"Erfinde oder dichte nichts hinzu. Halte dich kurz, maximal 30 Worte." +
													"Es ist ein Mittelteil, verwende keinen Anfang und mache keinen Abschluss."}
					]
					messages.push({role: "user", content: promptO1});

					completion = await openAIApi.createChatCompletion({
						model: "gpt-3.5-turbo",
						messages: messages,
					});
					console.log(completion)
					text[index++] = completion.data.choices[0].message.content;

					document.getElementById("loading2").style.display = "none";

					//--- DIARY TEXT ---//
					outputText = oldText + " " + text[1];
					oldText = outputText;
					output2.innerHTML = outputText + " -" + promptName1;
					messages.push({role: "assistant", content: outputText})

					//--- DALL-E REQUEST ---//
					const response1 = await openAIApi.createImage({
						prompt: "Eine Bleistiftskizze von folgendem: " + promptObject1,
						n: 1,
						size: "256x256",
					});
					const image_url_Ob1 = response1.data.data[0].url;

					document.getElementById('img_Obj_1').src = image_url_Ob1;
			break;
			case 4: //--- GET FORM INFORMARTION ---//
					const promptObject2 = document.querySelector('#neg_Obj_2').value;
					const promptObjectS2 = document.querySelector('#neg_Obj_2_Story').value;
					const promptO2 = "der alter Text: " + oldText + ", Objekt: " + promptObject2 + ", Geschichte hinter dem Objekt: " + promptObjectS2;

					//--- CHAT GPT REQUEST ---//
					messages = [
						{role: "system", content: 	"Du hilfst mir einen negativen Tagebucheintrag über " + promptName2 + " zu ergänzen. "},
						{role: "user", content: "Der alte Text: " + oldText},
						{role: "assistant", content: "Ergänze den alten Text um folgendes: " +
													 "'Objekt' und 'Geschichte hinter dem Objekt'. " +
													 "Erfinde oder dichte nichts hinzu. Halte dich kurz, maximal 30 Worte." +
													 "Es ist ein Mittelteil, verwende keinen Anfang und mache keinen Abschluss."}
					]
					messages.push({role: "user", content: promptO2});

					completion = await openAIApi.createChatCompletion({
						model: "gpt-3.5-turbo",
						messages: messages,
					});
					console.log(completion)
					text[index++] = completion.data.choices[0].message.content;

					document.getElementById("loading3").style.display = "none";

					//--- DIARY TEXT ---//
					outputText = oldText + " " + text[2];
					oldText = outputText;
					output3.innerHTML = outputText + " -" + promptName1;
					messages.push({role: "assistant", content: outputText})

					//--- DALL-E REQUEST ---//
					const response2 = await openAIApi.createImage({
						prompt: "Eine Bleistiftskizze von folgendem: " + promptObject2,
						n: 1,
						size: "256x256",
					});
					const image_url_Ob2 = response2.data.data[0].url;

					const image_Obj_2 = document.getElementById('img_Obj_2').src = image_url_Ob2; 
			break;

			case 6: //--- GET FORM INFORMARTION ---//
					const promptObject3 = document.querySelector('#pos_Obj_1').value;
					const promptObjectS3 = document.querySelector('#pos_Obj_1_Story').value;
					const promptO3 = 	"Der alte Text: " + oldText +
										", positives Objekt: "  + promptObject3 + 
										", Geschichte hinter dem Objekt: " + promptObjectS3;

					//--- CHAT GPT REQUEST ---//
					messages = [
					{role: "system", content: 	"Du hilfst mir zu einen negativen Tagebucheintrag über " + promptName2 + " einen positiven Eintrag zu ergänzen. "},
					{role: "assistant", content: "Du ergänzt den negativen Tagebucheintrag um folgendes: " +
												"'positives Objekt' und seiner 'Geschichte hinter dem Objekt' " +
												"Erfinde oder dichte nichts hinzu. Halte dich kurz, maximal 30 Worte." +
												"Es ist ein Mittelteil, verwende keinen Anfang und mache keinen Abschluss."}
					]
					messages.push({role: "user", content: promptO3});

					completion = await openAIApi.createChatCompletion({
						model: "gpt-3.5-turbo",
						messages: messages,
					});
					console.log(completion)
					text[index++] = completion.data.choices[0].message.content;

					document.getElementById("loading4").style.display = "none";

					//--- DIARY TEXT ---//
					outputText = text[0] + " " + text[1] + " " + text[3];
					oldText = outputText;
					output4.innerHTML = outputText + " -" + promptName1;
					messages.push({role: "assistant", content: outputText})

					//--- DALL-E REQUEST ---//
					const response3 = await openAIApi.createImage({
						prompt: "Eine Bleistiftskizze von folgendem: " + promptObject3,
						n: 1,
						size: "256x256",
					});
					const image_url_Ob3 = response3.data.data[0].url;

					document.getElementById('img_Obj_2').src = image_url_Ob3; 
			break;

			case 8: //--- GET FORM INFORMARTION ---//
					const promptObject4 = document.querySelector('#pos_Obj_2').value;
					const promptObjectS4 = document.querySelector('#pos_Obj_2_Story').value;
					const promptO4 = 	"Der alte Text: " + oldText +
										", positives Objekt: "  + promptObject4 + 
										", Geschichte hinter dem Objekt: " + promptObjectS4;

					//--- CHAT GPT REQUEST ---//
					messages = [
					{role: "system", content: 	"Du hilfst mir zu einen negativen Tagebucheintrag über " + promptName2 + " einen positiven Eintrag zu erstellen. "},
					{role: "assistant", content: "Du ergänzt den negativen Tagebucheintrag um folgendes: " +
												"'positives Objekt' und seiner 'Geschichte hinter dem Objekt' " +
												"Erfinde oder dichte nichts hinzu. Halte dich kurz, maximal 30 Worte." +
												"Es ist ein Mittelteil, verwende keinen Anfang und mache keinen Abschluss."}
					]
					messages.push({role: "user", content: promptO4});

					completion = await openAIApi.createChatCompletion({
						model: "gpt-3.5-turbo",
						messages: messages,
					});
					console.log(completion)
					text[index++] = completion.data.choices[0].message.content;

					document.getElementById("loading5").style.display = "none";

					//--- DIARY TEXT ---//
					outputText = text[0] + " " + text[3] + " " + text[4];
					oldText = outputText;
					output5.innerHTML = outputText + " -" + promptName1;
					messages.push({role: "assistant", content: outputText})

					//--- DALL-E REQUEST ---//
					const response4 = await openAIApi.createImage({
						prompt: "Eine Bleistiftskizze von folgendem: " + promptObject4,
						n: 1,
						size: "256x256",
					});
					const image_url_Ob4 = response4.data.data[0].url;

					document.getElementById('img_Obj_1').src = image_url_Ob4; 
			break;

			case 9: //--- GET FORM INFORMARTION ---//
			     	const promptO5 = 	"Der alte Text: " + oldText;
					//--- CHAT GPT REQUEST ---// 
					messages = [
					{role: "system", content: 	"Du hilfst mir einen Tagebucheintrag über " + promptName2 + " umzuwandeln."},
					{role: "assistant", content: "Nimm die negativen Teile und wandle sie ins positive: " +
												"Erfinde oder dichte nichts hinzu. "}
					]
					messages.push({role: "user", content: promptO5});

					completion = await openAIApi.createChatCompletion({
						model: "gpt-3.5-turbo",
						messages: messages,
					});
					console.log(completion)
					text[index++] = completion.data.choices[0].message.content;

					document.getElementById("loading6").style.display = "none";

				//--- DIARY TEXT ---//
				outputText = text[5];
				oldText = outputText;
				output6.innerHTML = outputText + " -" + promptName1;
				messages.push({role: "assistant", content: outputText})
		break;
		
        case 11:
		break;
	}
});

var i = 0;
var speed = 50; /* The speed/duration of the effect in milliseconds */

/*function typeWriter() {
	for(let i = 0; i < outputText.length; i++){
		output.innerHTML += output.charAt(i);
		setTimeout(typeWriter, speed);
	}
  	output.innerHTML = outputText + " " + promptName1;
}*/