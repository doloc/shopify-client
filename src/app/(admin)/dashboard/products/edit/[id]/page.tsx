'use client'
import { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
// @ts-ignore
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

type ProductFormType = {
    name: string;
    category: string;
    price: string;
    quantity: string;
    status: string;
    description: string;
    specifications: string;
    images: { url: string }[]; // Mỗi phần tử trong mảng images là một object có thuộc tính url
};

const ProductEdit = () => {
    const [activeSection, setActiveSection] = useState("products");
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState<ProductFormType>({
        name: "",
        category: "Kitchen",
        price: "",
        quantity: "",
        status: "public",
        description: "",
        specifications: "",
        images: []
    });

    const handleImageUpload = (e: any) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
          url: URL.createObjectURL(file as MediaSource), /* file as Blob */
          file
        }));
        setProductForm((prev: any) => ({
          ...prev,
          images: [...prev.images, ...newImages]
        }));
    };
    
    const handleImageDelete = (index: number) => {
        setProductForm(prev => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index)
        }));
    };
    
    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(productForm.images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setProductForm(prev => ({ ...prev, images: items }));
    };

    const handleSave = () => {
        setActiveSection("products");
        setEditingProduct(null);
    };
    
    const handleCancel = () => {
        setActiveSection("products");
        setEditingProduct(null);
    };
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Product</h2>
                <div className="flex gap-4">
                    <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                    Save Changes
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                        value={productForm.category}
                        onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="Kitchen">Kitchen</option>
                        <option value="Bathroom">Bathroom</option>
                    </select>
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                        min="0"
                        step="0.01"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <input
                        type="number"
                        value={productForm.quantity}
                        onChange={(e) => setProductForm(prev => ({ ...prev, quantity: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                        min="0"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                        <input
                            type="radio"
                            checked={productForm.status === "public"}
                            onChange={() => setProductForm(prev => ({ ...prev, status: "public" }))}
                            className="mr-2"
                        />
                        Public
                        </label>
                        <label className="flex items-center">
                        <input
                            type="radio"
                            checked={productForm.status === "private"}
                            onChange={() => setProductForm(prev => ({ ...prev, status: "private" }))}
                            className="mr-2"
                        />
                        Private
                        </label>
                    </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Images</label>
                        <div className="border-2 border-dashed rounded-lg p-4">
                            <input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            accept="image/*"
                            />
                            <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center cursor-pointer"
                            >
                            <FiUpload className="text-3xl text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Click or drag images to upload</span>
                            </label>
                        </div>
                        {/* <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="images" direction="horizontal">
                            {(provided: any) => (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex flex-wrap gap-4 mt-4"
                                >
                                {productForm.images.map((image, index) => (
                                    <Draggable
                                    key={index}
                                    draggableId={`image-${index}`}
                                    index={index}
                                    >
                                    {(provided: any) => (
                                        <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="relative w-24 h-24"
                                        >
                                        <img
                                            src={image.url}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => handleImageDelete(index)}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                                        >
                                            <FiX />
                                        </button>
                                        </div>
                                    )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                </div>
                            )}
                            </Droppable>
                        </DragDropContext> */}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        {/* <ReactQuill
                            value={productForm.description}
                            onChange={(content) => setProductForm(prev => ({ ...prev, description: content }))}
                            className="h-32 mb-12"
                        /> */}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Specifications</label>
                        {/* <ReactQuill
                            value={productForm.specifications}
                            onChange={(content) => setProductForm(prev => ({ ...prev, specifications: content }))}
                            className="h-32 mb-12"
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductEdit