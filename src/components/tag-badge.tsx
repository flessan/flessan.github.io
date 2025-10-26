import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface TagBadgeProps {
    tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
    return (
        <Badge variant="secondary" className="font-normal bg-accent/10 border-accent/20 text-accent-foreground hover:bg-accent/20">
            <Tag className="h-3 w-3 mr-1.5 text-accent" />
            {tag}
        </Badge>
    );
}
