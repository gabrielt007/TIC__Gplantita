const API_URL = "https://router.huggingface.co/fal-ai/fal-ai/flux/dev?_subdomain=queue"

const API_KEY = import.meta.env.VITE_HIGGINGFACE_API_KEY

const generateAvatar =  async(promptFormUser) =>{
    const response = await fetch(API_URL,{
    headers: {
		Authorization: `Bearer ${API_KEY}`,
		"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
            model: "black-forest-labs/FLUX.1-dev",
            inputs: promptFormUser
        }),
    })
    const data = await response.json()

    const base64 = data.data[0].b64_json

    const byteCharacters = atob(base64)

    const byteArrys = Uint8Array.from(byteCharacters, c => c.charCodeAt(0))

    const blob = new Blob([byteArrys], { type: "image/png"})

    return blob
    



}