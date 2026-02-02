const request = require('supertest')
const { app, server, sessionStore } = require("./Server/Server")
describe("Post Testomonies",()=>{
  //1
    test("Asignar directamente Created_by",async()=>{
        const res = await request(app).post("/Api/Testimonies/SendTestimonies").send({
        Type: 'Video',
        Title: 'Mi Testimonio',
        Content: 'Dios es bueno',
        Author: 'Ricardo',
        Video_url: 'https://youtube.com/watch?v=123'
        
      })

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true)
    })
    //2 
    test("Enviando info invalida a updateAbout",async()=>{
      const res = await request(app).post("/Api/About/Update").send({
        name:23,
        info: "rgregregergrg"
      })
       expect(res.statusCode).toBe(404)
       expect(res.body.success).toBe(false)
       console.log("Se detecto aqui y corrigio")
    }
 
  )
    
   afterAll(async () => {
    // 1. Cerrar el servidor
    if (server) {
        await new Promise((resolve) => server.close(resolve));
    }

    // 2. CERRAR EL STORE DE SESIONES (Esto es lo que te está fallando)
    if (sessionStore && sessionStore.close) {
        await new Promise((resolve) => sessionStore.close(resolve));
    }
    
    // 3. Un pequeño respiro para que MySQL suelte los hilos
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("✅ Todo cerrado: Servidor y Sesiones.");
});
})