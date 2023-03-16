@isTest
private with sharing class TestMetadataSelector {
  private class WebServiceMockImpl implements WebServiceMock {
    public void doInvoke(
      Object stub,
      Object request,
      Map<String, Object> response,
      String endpoint,
      String soapAction,
      String requestName,
      String responseNS,
      String responseName,
      String responseType
    ) {
      MetadataService.FileProperties prop1 = new MetadataService.FileProperties();
      prop1.id = '123145646';
      prop1.fullName = 'TestClass1';
      prop1.fileName = 'classes/TestClass1';
      prop1.manageableState = 'unmanaged';
      prop1.namespacePrefix = null;
      prop1.type_x = 'ApexClass';

      MetadataService.FileProperties prop2 = new MetadataService.FileProperties();
      prop2.id = '12354689';
      prop2.fullName = 'TEST__TestClass2';
      prop2.fileName = 'classes/TEST__TestClass2';
      prop2.manageableState = 'managed';
      prop2.namespacePrefix = 'TEST';
      prop2.type_x = 'ApexClass';

      MetadataService.listMetadataResponse_element element = new MetadataService.listMetadataResponse_element();
      element.result = new List<MetadataService.FileProperties>{ prop1, prop2 };

      if (request instanceof MetadataService.listMetadata_element)
        response.put('response_x', element);
      return;
    }
  }

  @isTest
  static void testGetMetadataAll() {
    // Null Web Service mock implementation
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    String data = MetadataSelector.listMetadata('ApexClass', '', 'all');
    Test.stopTest();

    List<MetadataSelector.fileProperty> results = formatResults(data);

    System.assertEquals(2, results.size(), 'Check that two are returned');
  }

  @isTest
  static void testGetMetadataAllWithFolders() {
    // Null Web Service mock implementation
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    String data = MetadataSelector.listMetadata('Report', 'unfiled$public', 'all');
    Test.stopTest();

    List<MetadataSelector.fileProperty> results = formatResults(data);
  }

  @isTest
  static void testGetMetadataUnmanaged() {
    // Null Web Service mock implementation
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    String data = MetadataSelector.listMetadata('ApexClass', '', 'unmanagedOnly');
    Test.stopTest();

    List<MetadataSelector.fileProperty> results = formatResults(data);
    System.assertEquals(1, results.size(), 'Check that one is returned');
    System.assertEquals(null, results[0].namespacePrefix, 'check only unmanaged is returned');
    System.assertEquals('unmanaged', results[0].manageableState, 'check only unmanaged is returned');
  }

  @isTest
  static void testGetMetadataManaged() {
    // Null Web Service mock implementation
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    String data = MetadataSelector.listMetadata('ApexClass', '', 'managedOnly');
    Test.stopTest();

    List<MetadataSelector.fileProperty> results = formatResults(data);
    System.assertEquals(1, results.size(), 'Check that one is returned');
    System.assertEquals('TEST', results[0].namespacePrefix, 'check only managed is returned');
    System.assertEquals('managed', results[0].manageableState, 'check only managed is returned');
  }

  @isTest
  static void testGetMetadataInvalidMetadata() {
    // Null Web Service mock implementation
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());
    String data, error;

    Test.startTest();
    try {
      data = MetadataSelector.listMetadata('Test', '', 'managedOnly');
    } catch (Exception ex) {
      error = ex.getMessage();
    }
    Test.stopTest();

    System.assertEquals(null, data, 'Check that null is returned');
    System.assertEquals(System.Label.Invalid_Metadata_Types, error, 'Check Metadata Type Error Message');
  }

  @isTest
  static void testGetMetadataInvalidPackage() {
    // Null Web Service mock implementation
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());
    String data, error;

    Test.startTest();
    try {
      data = MetadataSelector.listMetadata('ApexClass', '', 'test');
    } catch (Exception ex) {
      error = ex.getMessage();
    }
    Test.stopTest();

    System.assertEquals(null, data, 'Check that null is returned');
    System.assertEquals(System.Label.Invlid_Package_Types, error, 'Check Package Type Error Message');
  }

  @isTest
  static void testListFolders() {
    Test.startTest();
    String results = MetadataSelector.listFolders('Report');
    Test.stopTest();
  }

  private static List<MetadataSelector.fileProperty> formatResults(String data) {
    List<MetadataSelector.fileProperty> props = (List<MetadataSelector.fileProperty>) JSON.deserialize(
      data,
      List<MetadataSelector.fileProperty>.class
    );

    return props;
  }
}
