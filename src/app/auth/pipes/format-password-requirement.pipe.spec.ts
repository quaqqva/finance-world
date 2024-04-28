import { FormatPasswordRequirementPipe } from './format-password-requirement.pipe';

describe('FormatPasswordRequirementPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatPasswordRequirementPipe();
    expect(pipe).toBeTruthy();
  });
});
