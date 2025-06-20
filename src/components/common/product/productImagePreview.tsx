// components/image-upload-preview.tsx
import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageIcon, Trash2, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadPreviewProps {
    value: string;
    onChange: (url: string) => void;
    className?: string;
}

export function ImageUploadPreview({ value, onChange, className }: ImageUploadPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState(value);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Converte arquivo para base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
        });
    };

    // Manipula upload de arquivo
    const handleFileUpload = useCallback(async (file: File) => {
        if (!file.type.match('image.*')) {
        alert('Por favor, selecione um arquivo de imagem válido');
        return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB max
        alert('O arquivo é muito grande (máximo 5MB)');
        return;
        }

        setIsLoading(true);
        try {
        const base64 = await fileToBase64(file);
        setPreviewUrl(base64);
        onChange(base64);
        } catch (error) {
        console.error('Erro ao processar imagem:', error);
        alert('Erro ao processar imagem');
        } finally {
        setIsLoading(false);
        }
    }, [onChange]);

    // Manipula seleção de arquivo via input
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) await handleFileUpload(file);
        e.target.value = ''; // Reset input para permitir selecionar o mesmo arquivo novamente
    };

    // Manipula drag and drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const file = e.dataTransfer.files?.[0];
        if (file) await handleFileUpload(file);
    };

    // Manipula URL de imagem
    const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setPreviewUrl(url);
        onChange(url);
    };

    const handleRemoveImage = () => {
        setPreviewUrl('');
        onChange('');
    };

    return (
        <div className={cn('space-y-4', className)}>
        {/* Seção de Upload */}
        <div 
            className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
            isDragOver ? 'border-primary bg-primary/10' : 'border-muted-foreground/30'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center space-y-4">
            <UploadCloud className="h-10 w-10 text-muted-foreground" />
            <div className="space-y-2">
                <p className="text-sm font-medium">
                Arraste e solte sua imagem aqui ou
                </p>
                <Button 
                type="button" 
                variant="outline"
                className="relative"
                disabled={isLoading}
                >
                Selecione um arquivo
                <Input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">
                Formatos suportados: JPG, PNG, WEBP (até 5MB)
            </p>
            </div>
        </div>

        {/* Ou */}
        <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-muted-foreground/30"></div>
            <span className="mx-4 text-sm text-muted-foreground">OU</span>
            <div className="flex-grow border-t border-muted-foreground/30"></div>
        </div>

        {/* Seção de URL */}
        <div className="space-y-2">
            <div className="flex items-center gap-2">
            <Input
                type="url"
                placeholder="Cole a URL da imagem"
                value={previewUrl?.startsWith('http') ? previewUrl : ''}
                onChange={handleImageUrlChange}
                disabled={isLoading}
            />
            {previewUrl && (
                <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={handleRemoveImage}
                disabled={isLoading}
                >
                <Trash2 className="h-4 w-4" />
                </Button>
            )}
            </div>
        </div>

        {/* Pré-visualização */}
        {isLoading ? (
            <div className="flex aspect-video items-center justify-center rounded-md border bg-muted">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        ) : previewUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-md border">
            <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-contain bg-muted"
                onError={() => {
                setPreviewUrl('');
                onChange('');
                alert('Não foi possível carregar a imagem');
                }}
            />
            </div>
        ) : (
            <div className="flex aspect-video items-center justify-center rounded-md border bg-muted">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            </div>
        )}
        </div>
    );
}