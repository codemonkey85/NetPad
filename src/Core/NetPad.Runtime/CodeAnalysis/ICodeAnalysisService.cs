﻿using Microsoft.CodeAnalysis;
using NetPad.DotNet;

namespace NetPad.CodeAnalysis;

public interface ICodeAnalysisService
{
    /// <summary>
    /// Gets the full <see cref="SyntaxTree"/> representing a code string.
    /// </summary>
    /// <param name="code">The code string to parse.</param>
    /// <param name="targetFrameworkVersion">The .NET framework version to use to analyze code.</param>
    /// <param name="optimizationLevel">The optimization level to use when parsing code.</param>
    /// <param name="cancellationToken"></param>
    SyntaxTree GetSyntaxTree(
        string code,
        DotNetFrameworkVersion targetFrameworkVersion,
        OptimizationLevel optimizationLevel,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets a lighter (slimmer) representation of a syntax tree representing a code string. Useful if planning
    /// to serialize result, as the <see cref="SyntaxTree"/> is deeply nested and huge.
    /// </summary>
    /// <param name="code">The code string to parse.</param>
    /// <param name="targetFrameworkVersion">The .NET framework version to use to analyze code.</param>
    /// <param name="optimizationLevel">The optimization level to use when parsing code.</param>
    /// <param name="cancellationToken"></param>
    /// <returns>The root syntax node (or token when applicable).</returns>
    SyntaxNodeOrTokenSlim GetSyntaxTreeSlim(
        string code,
        DotNetFrameworkVersion targetFrameworkVersion,
        OptimizationLevel optimizationLevel,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Generates the Intermediate Language (IL) code representation from a compiled assembly.
    /// </summary>
    /// <param name="assembly">The compiled assembly bytes to disassemble into IL code.</param>
    /// <param name="includeAssemblyHeader">If true, will write the assembly header to the generated IL.</param>
    /// <param name="cancellationToken"></param>
    /// <returns>A string containing the IL code representation of the assembly, formatted for readability.</returns>
    string GetIntermediateLanguage(
        byte[] assembly,
        bool includeAssemblyHeader = false,
        CancellationToken cancellationToken = default);
}
