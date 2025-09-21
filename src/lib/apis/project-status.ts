export enum ProjectStatus {
    Planning = 'planning',
    Planned = 'planned',
    Ongoing = "ongoing",
    Complete = "complete",
    Abandoned = "abandoned",
}

export function getProjectStatusAsIcon(status: ProjectStatus): string {
    switch (status) {
        case ProjectStatus.Planning:
            return "material:emoji_objects";

        case ProjectStatus.Planned:
            return "material:event_available";

        case ProjectStatus.Ongoing:
            return "material:design_services";

        case ProjectStatus.Complete:
            return "material:check_circle";

        case ProjectStatus.Abandoned:
            return "material:cancel";

        default:
            throw new Error(`Out of range: ${status}`);
    }
}