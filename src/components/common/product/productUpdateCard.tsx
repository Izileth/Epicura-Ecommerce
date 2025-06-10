// src/routes/products/edit.$id.tsx
import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
    const { currentProduct, fetchProductById, updateProduct } = useProductStore();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
    });

    useEffect(() => {
        if (id && user?.id) {
        fetchProductById(user.id, id);
        }
    }, [id, user?.id, fetchProductById]);

    useEffect(() => {
        if (currentProduct) {
        form.reset(currentProduct);
        }
    }, [currentProduct, form]);

    const onSubmit = async (values: ProductFormValues) => {
        try {
        if (!user?.id || !id) throw new Error("Dados incompletos");
        
        await updateProduct(user.id, id, values);
        navigate({ to: "/products/user" });
        } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        }
    };

    if (!currentProduct || !form.formState.isDirty) {
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
        <div className="container py-8 max-w-4xl">
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
                        <Input type="number" placeholder="0.00" {...field} />
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
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate({ to: "/products/user" })}>
                Cancelar
                </Button>
                <Button type="submit">Atualizar Produto</Button>
            </div>
            </form>
        </Form>
        </div>
    );
}