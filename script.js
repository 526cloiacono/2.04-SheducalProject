    async function loadData() {
        try {
            const response = await fetch("data.json")
            const data = await response.json("")
            console.log(data)

        }catch (err) { 
            console.log("error", err)
        }

    }
    loadData()