document.getElementById("dustbinForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const lat = document.getElementById("lat");
    const lon = document.getElementById("lon");
    const fill = document.getElementById("fill");
    const weight = document.getElementById("weight");
    const address = document.getElementById("address");
    const floor = document.getElementById("floor");
    const block = document.getElementById("block");
    const phone = document.getElementById("phone");

    // const user_id = document.getElementById("user_id") || "";

    const responseMessage = document.getElementById("responseMessage");

    // Disable button while submitting
    const submitButton = e.target.querySelector("button");
    submitButton.disabled = true;
    submitButton.innerText = "Submitting...";

    try {
        const response = await fetch("http://localhost:4000/api/add-dustbin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lat: lat.value,
                lon: lon.value,
                fill: fill.value,
                weight: weight.value,
                address: address.value,
                floor: floor.value,
                block: block.value,
                phone: phone.value,
                // user_id: user_id?.value
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            responseMessage.style.color = "green";
            responseMessage.innerText = "✅ Dustbin added successfully!";
            
            // **Clear Form Fields**
            lat.value = "";
            lon.value = "";
            fill.value = "";
            weight.value = "";
            address.value = "";
            floor.value = "";
            block.value = "";
            phone.value = "";
            // user_id.value = "";

        } else {
            responseMessage.style.color = "red";
            responseMessage.innerText = `❌ Error: ${data.message || "Something went wrong!"}`;
        }
    } catch (error) {
        responseMessage.style.color = "red";
        responseMessage.innerText = "❌ Network error! Please try again.";
    }

    // Enable button again
    submitButton.disabled = false;
    submitButton.innerText = "Submit";
});
