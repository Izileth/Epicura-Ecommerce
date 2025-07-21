
import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ImageUploadPreview } from "./productImagePreview";
import { CategorySelect } from "./productCategorySelector";
import { TagsInput } from "./productTagsImpur";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useProductStore } from "@/store/product";
import type { ProductFormValues } from "@/types/product";
import { productSchema } from "@/validations/product.schema";
import useAuthStore from "@/store/auth";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export function EditProductPage() {
    const { id } = useParams({ strict: false });
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { 
        currentProduct, 
        fetchProductById, 
        updateProduct,
        isLoading 
    } = useProductStore();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            description: "",
            imageUrl: "",
            price: 0,
            link: "",
            isAvailable: true,
            tags: [],
            categoryId: ""
        }
    });

    // Carrega o produto quando o ID ou usuário mudam
    useEffect(() => {
        if (id && user?.id) {
            fetchProductById(user.id, id);
        }
    }, [id, user?.id, fetchProductById]);

    // Preenche o formulário quando o produto é carregado
    useEffect(() => {
        if (currentProduct) {
            form.reset({
                title: currentProduct.title,
                description: currentProduct.description || "",
                imageUrl: currentProduct.imageUrl || "",
                price: currentProduct.price,
                link: currentProduct.link || "",
                isAvailable: currentProduct.isAvailable,
                tags: currentProduct.tags || [],
                categoryId: currentProduct.categoryId || ""
            });
        }
    }, [currentProduct, form]);

    const onSubmit = async (values: ProductFormValues) => {
        try {
            if (!user?.id || !id) throw new Error("Dados incompletos");
            
            await updateProduct(user.id, id, {
                ...values,
                // Garante que campos opcionais não sejam undefined
                description: values.description || "",
                imageUrl: values.imageUrl || "",
                link: values.link || "",
                tags: values.tags || [],
                categoryId: values.categoryId || undefined
            });
            
            navigate({ to: "/products/user" });
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    if (isLoading || !currentProduct) {
        return (
            <div className="container py-8 max-w-4xl space-y-6">
                <Skeleton className="h-10 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8 max-w-4xl px-6 md:px-0">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Editar Produto</h1>
                <Button variant="ghost" onClick={() => navigate({ to: "/products/user" })}>
                    Voltar
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do produto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descreva seu produto" {...field} rows={5} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number" 
                                            placeholder="0.00" 
                                            {...field}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                field.onChange(isNaN(value) ? 0 : value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Categoria</FormLabel>
                                    <FormControl>
                                        <CategorySelect
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <TagsInput
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            suggestions={['popular', 'novidade', 'promoção', 'esgotando']}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isAvailable"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>Disponível para venda</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Imagem do Produto</FormLabel>
                                    <FormControl>
                                        <ImageUploadPreview
                                            className="h-auto"
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => navigate({ to: "/products/user" })}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={!form.formState.isDirty}>
                            Atualizar Produto
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}