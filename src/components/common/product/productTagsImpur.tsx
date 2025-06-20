// components/tags-input.tsx
import { useState} from 'react';
import type { KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TagsInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    suggestions?: string[];
}

export function TagsInput({ value, onChange, suggestions = [] }: TagsInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (['Enter', 'Tab', ','].includes(e.key)) {
        e.preventDefault();
        addTag();
        }
    };

    const addTag = () => {
        const tag = inputValue.trim();
        if (tag && !value.includes(tag)) {
        onChange([...value, tag]);
        setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    const filteredSuggestions = suggestions.filter(
        suggestion => 
        !value.includes(suggestion) && 
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
            {value.map(tag => (
            <Badge key={tag} variant="secondary">
                {tag}
                <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                >
                <X className="h-3 w-3" />
                </button>
            </Badge>
            ))}
            <Input
            type="text"
            placeholder="Adicione tags..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            className="flex-1 min-w-[120px]"
            />
        </div>

        {inputValue && filteredSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
            {filteredSuggestions.slice(0, 5).map(suggestion => (
                <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => {
                    onChange([...value, suggestion]);
                    setInputValue('');
                }}
                >
                {suggestion}
                </Badge>
            ))}
            </div>
        )}
        </div>
    );
}