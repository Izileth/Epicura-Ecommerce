
import { useState } from "react";
import type { Testimonial } from "@/components/common/testmonial";
export const useTestimonialCarousel = (initialTestimonials: Testimonial[] = []) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    const addTestimonial = (testimonial: Testimonial) => {
        setTestimonials(prev => [...prev, testimonial]);
    };

    const removeTestimonial = (testimonialId: string) => {
        setTestimonials(prev => prev.filter(test => test.id !== testimonialId));
    };

    const updateTestimonial = (testimonialId: string, updates: Partial<Testimonial>) => {
        setTestimonials(prev => 
        prev.map(test => 
            test.id === testimonialId ? { ...test, ...updates } : test
        )
        );
    };

    return {
        testimonials,
        selectedTestimonial,
        setSelectedTestimonial,
        addTestimonial,
        removeTestimonial,
        updateTestimonial,
        setTestimonials
    };
};
