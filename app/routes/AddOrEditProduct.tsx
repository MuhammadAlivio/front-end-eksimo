import { useState, useEffect } from "react";
import axios from "axios";

export default function AddOrEditProduct() {
  const [productId, setProductId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: null as File | null,
    imageUrl: "", // untuk preview gambar lama
  });

  // Ambil productId dari path
  useEffect(() => {
    if (typeof window !== "undefined") {
      const match = window.location.pathname.match(/^\/product\/(\d+)/);
      if (match) {
        setProductId(match[1]);
      }
    }
  }, []);

  // Fetch data produk jika edit
  useEffect(() => {
    if (productId) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8080/api/admin/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const p = res.data;
          setForm({
            name: p.name,
            description: p.description,
            price: p.price,
            stock: p.stock,
            categoryId: p.category?.id || "",
            image: null,
            imageUrl: p.image || "",
          });
        })
        .catch((err) => {
          console.error("Failed to fetch product:", err);
        });
    }
  }, [productId]);

  const isEdit = !!productId;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as any;
    if (name === "image") {
      setForm((f) => ({
        ...f,
        image: files[0],
        imageUrl: files[0] ? URL.createObjectURL(files[0]) : f.imageUrl,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Validasi image wajib diisi saat add
    if (!isEdit && !form.image) {
      alert("Image is required");
      return;
    }

    const data = new FormData();
    data.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            name: form.name,
            description: form.description,
            price: Number(form.price),
            stock: Number(form.stock),
            categoryId: Number(form.categoryId),
            image: "", // backend akan handle file image
          }),
        ],
        { type: "application/json" }
      )
    );
    if (form.image) data.append("image", form.image);

    try {
      if (isEdit && productId) {
        // UPDATE
        await axios.put(
          `http://localhost:8080/api/admin/products/${productId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // ADD
        await axios.post("http://localhost:8080/api/admin/products", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      window.location.href = "/admin";
    } catch (err: any) {
      console.error(
        isEdit ? "Failed to update product:" : "Failed to add product:",
        err.response?.data || err.message
      );
      alert(
        err.response?.data?.message ||
          (isEdit ? "Failed to update product" : "Failed to add product")
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Edit" : "Add"} Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2"
          required
        />
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2"
          required
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border p-2"
          required
        >
          <option value="">Select Category</option>
          <option value="1">Baju</option>
          <option value="2">Outer</option>
          <option value="3">Accessories</option>
        </select>
        {/* Field image untuk add/edit */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Product"
              className="mb-2 w-32 h-32 object-cover rounded"
            />
          )}
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
            // required hanya saat add
            required={!isEdit}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update" : "Add"} Product
        </button>
      </form>
    </div>
  );
}
