export default class Backend{
    constructor(){}

    async insert(data) {
        try {
            const response = await fetch('http://localhost:3001/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const jsonResponse = await response.json();
            console.log('Server response:', jsonResponse);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async read(){
        try {
            const response = await fetch('http://localhost:3001/data');
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
            
            let highScores = await response.json();
            return highScores; 
        } catch (error) {
            console.error('Error:', error);
        }
    }
}