import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCategories } from '@/hooks/useCategory';
interface CategorySelectProps {
    value: string;
    onChange: (value: string) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const { categories = [], createCategory } = useCategories(); // Fallback para array vazio

    const handleCreateCategory = async () => {
        if (!search.trim()) return;
        
        try {
        const newCategory = await createCategory({ name: search });
        onChange(newCategory.id);
        setSearch('');
        setOpen(false);
        } catch (error) {
        console.error('Failed to create category:', error);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                >
                {value
                    ? categories.find((category) => category.id === value)?.name
                    : "Selecione uma categoria..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                <CommandInput 
                    placeholder="Buscar categoria..." 
                    value={search}
                    onValueChange={setSearch}
                />
                <CommandEmpty className="py-2 px-4 text-sm">
                    <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={handleCreateCategory}
                    >
                    <Plus className="mr-2 h-4 w-4" />
                    Criar "{search}"
                    </Button>
                </CommandEmpty>
                <CommandGroup className="max-h-[200px] overflow-y-auto">
                    {(categories || []).map((category) => ( // Proteção adicional
                    <CommandItem
                        key={category.id}
                        value={category.id}
                        onSelect={() => {
                        onChange(category.id);
                        setOpen(false);
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            value === category.id ? "opacity-100" : "opacity-0"
                        )}
                        />
                        {category.name}
                    </CommandItem>
                    ))}
                </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}