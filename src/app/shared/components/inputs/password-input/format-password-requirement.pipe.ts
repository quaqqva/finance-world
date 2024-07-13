import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPasswordRequirement',
  standalone: true,
})
export class FormatPasswordRequirementPipe implements PipeTransform {
  transform(requirementText: string, isRequirementFailed: boolean): string {
    return isRequirementFailed
      ? `❌ ${requirementText}`
      : `✅ ${requirementText}`;
  }
}
