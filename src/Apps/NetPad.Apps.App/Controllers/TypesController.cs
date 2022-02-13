using Microsoft.AspNetCore.Mvc;
using NetPad.Commands;
using NetPad.Events;
using NetPad.Scripts;
using NetPad.UiInterop;

namespace NetPad.Controllers
{
    [ApiController]
    [Route("types")]
    public class TypesController : Controller
    {
        // This endpoint was created for the sole reason of providing Swagger with types that are not exposed by other endpoints
        // that we want in the generated code
        [ProducesResponseType(typeof(Types), 200)]
        [HttpGet]
        public void AdditionalTypes()
        {
        }

        private class Types
        {
            public YesNoCancel YesNoCancel { get; set; }

            public Script? Script { get; set; }
            public SettingsUpdated? SettingsUpdated { get; set; }
            public ScriptPropertyChanged? ScriptPropertyChanged { get; set; }
            public ScriptConfigPropertyChanged? ScriptConfigPropertyChanged { get; set; }
            public ScriptOutputEmitted? ScriptOutputEmitted { get; set; }
            public EnvironmentsAdded? EnvironmentsAdded { get; set; }
            public EnvironmentsRemoved? EnvironmentsRemoved { get; set; }
            public EnvironmentPropertyChanged? EnvironmentPropertyChanged { get; set; }
            public ActiveEnvironmentChanged? ActiveEnvironmentChanged { get; set; }
            public ScriptDirectoryChanged? ScriptDirectoryChanged { get; set; }
            public OpenWindowCommand? OpenWindowCommand { get; set; }
            public ConfirmSaveCommand? ConfirmSaveCommand { get; set; }
            public RequestNewScriptNameCommand? RequestNewScriptNameCommand { get; set; }
        }
    }
}
