const result = document.getElementById("result"); //savienajamies ar htmlk
const randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", async () => {
  try {
    // 1. LOADING STATE - parāda ielādes indikātoru
    result.innerHTML = '<p>Ielādē suņa bildi...</p>';
    randomBtn.disabled = true; // atspējo pogu ielādes laikā
    
    // 2. API pieprasījums
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    
// Pārbauda vai response ir OK
    if (res.status === 404) {
      throw new Error('NOT_FOUND');
    }
    if (res.status === 500) {
      throw new Error('SERVER_ERROR');
    }
    if (res.status === 429) {
      throw new Error('RATE_LIMIT');
    }
    if (!res.ok) {
      throw new Error('API_ERROR');
    }

    const data = await res.json();
    
    // Console logging debugošanai
    console.log('API atbilde:', data);
    
    const imageUrl = data.message;           // bildes links
    const parts = imageUrl.split("/");                // sadalam URL pa /
    const rawBreed = parts[parts.indexOf("breeds") + 1] || "";
    const breedName = rawBreed.replace("-", " ");     // piem. "bulldog-french" -> "bulldog french"
    
    // 3. DATU ATTĒLOŠANA - parāda suņa bildi
       if (data.status === "success" && data.message) {
      result.innerHTML = `
        <img src="${imageUrl}" alt="Nejauša suņa bilde"
             style="max-width: 100%; height: auto; border-radius: 8px;">
        <p style="font-weight: bold; text-transform: capitalize;">
          Šķirne: ${breedName || "Nezināma"}
        </p>
      `;
    } else {
      throw new Error('Neparedzēta datu struktūra');
    }
    
  } catch (error) {
    // 4. ERROR HANDLING - apstrādā kļūdas
    console.error('Detalizēta kļūda:', error);
    
    // Lietotājam draudzīgs ziņojums (bez tehniskiem terminiem)
    result.innerHTML = `
      <p style="color: red;">😕 Neizdevās ielādēt suņa bildi. 
      Lūdzu pārbaudi interneta savienojumu un mēģini vēlreiz.</p>
    `;
  } finally {
    // Vienmēr atspējo loading state
    randomBtn.disabled = false;
  }
}); 
