import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';
import productosRoutes from "./routes/productos.routes.js"; // ⬅ Ajusta la ruta real

dotenv.config({ path: "../.env" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const app = express();
const prisma = new PrismaClient();

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno no definidas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base
app.get("/", (req, res) => res.send("API funcionando 🚀"));

app.get("/test-supabase", async (req, res) => {
  const { data, error } = await supabase
    .from("nombre_de_tu_tabla")
    .select("*");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ⬅ Montar rutas de productos
app.use("/api/productos", productosRoutes);
  
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Servidor en http://localhost:${PORT}`)
);

// Prueba inicial al arrancar
(async () => {
  const { data, error } = await supabase.from('products').select('*');
  console.log(data, error);
})();
