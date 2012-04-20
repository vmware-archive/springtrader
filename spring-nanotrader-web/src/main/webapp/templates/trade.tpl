<div class="row">
    <div class="span12">
        <div class="well show-quote-box">
            <form class="form-inline">
                <label><%= translate("enterSymbol") %>:</label>
                <input type="text" class="span3" style="margin: 0 auto;" data-provide="typeahead" data-items="4" data-source='["VML","APPL","GOOG"]'>
                <button href="#" class="btn btn-inverse"><%= translate("getQuote") %></button>
            </form>
        </div>
    </div>
</div>

<div class="row">
    <div class="span12">
        <div class="alert alert-error">
            <a class="close" data-dismiss="alert">&times;</a>
            <%= translate("symbolDoesNotExist") %>
        </div>
    </div>
</div>

<div class="row">
    <div class="span12">
        <div class="well show-well">
            <div class="title"><h3><%= translate("resentOrders") %></h3></div>
            <table class="table table-striped table-bordered table-condensed">
                <tr>
                    <th><%= translate("orderId") %></th>
                    <th><%= translate("orderStatus") %></th>
                    <th><%= translate("creationDate") %></th>
                    <th><%= translate("completionDate") %></th>
                    <th><%= translate("transactionFee") %></th>
                    <th><%= translate("transactionType") %></th>
                    <th><%= translate("sympol") %></th>
                    <th><%= translate("quantity") %></th>
                </tr>
                <tr>
                    <td>1</td>
                    <td><span class="completed"><%= translate("completed") %></span></td>
                    <td>2 / 7 / 2012</td>
                    <td>2 / 7 / 2012</td>
                    <td>2</td>
                    <td>
                    <input type="text" placeholder="" class="input-mini">
                    <div class="modal hide fade myModal" id="myModal" style="display: none;">
                        <div class="modal-header">
                            <a class="close" data-dismiss="modal">&times;</a>
                            <h3><%= translate("orderConfirmation") %></h3>
                        </div>
                        <div class="modal-body">
                            <table class="table">
                                <tr>
                                    <td><%= translate("orderId") %>:</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td><%= translate("orderStatus") %>:</td>
                                    <td><span class="completed"><%= translate("completed") %></span></td>
                                </tr>
                                <tr>
                                    <td><%= translate("creationDate") %>:</td>
                                    <td>2 / 7 / 2012</td>
                                </tr>
                                <tr>
                                    <td><%= translate("completionDate") %>:</td>
                                    <td>2 / 7 / 2012</td>
                                </tr>
                                <tr>
                                    <td><%= translate("transactionFree") %>:</td>
                                    <td>VMW</td>
                                </tr>
                                <tr>
                                    <td><%= translate("sympol") %>:</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td><%= translate("quantity") %>:</td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="btn green-btn"><%= translate("ok") %></a>
                            <a href="#" class="btn btn-inverse"><%= translate("cancel") %></a>
                        </div>
                    </div>
                    <a href="#myModal" data-toggle="modal" class="btn green-btn"><%= translate("buy") %></a>
                    </td>
                    <td>VMW</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><span class="uncompleted"><%= translate("uncompleted") %></span></td>
                    <td>2 / 7 / 2012</td>
                    <td>2 / 7 / 2012</td>
                    <td>3</td>
                    <td>
                        <input type="text" placeholder="" class="input-mini">
                            <div class="modal hide fade myModal" id="myModal2" style="display: none;">
                                <div class="modal-header">
                                    <a class="close" data-dismiss="modal">&times;</a>
                                    <h3><%= translate("orderConfirmation") %></h3>
                                </div>
                                <div class="modal-body">
                                    <table class="table">
                                        <tr>
                                            <td><%= translate("orderId") %>:</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("orderStatus") %>:</td>
                                            <td><span class="completed"><%= translate("completed") %></span></td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("creationDate") %>:</td>
                                            <td>2 / 7 / 2012</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("completionDate") %>:</td>
                                            <td>2 / 7 / 2012</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("transactionFree") %>:</td>
                                            <td>VMW</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("sympol") %>:</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("quantity") %>:</td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn green-btn"><%= translate("ok") %></a>
                                    <a href="#" class="btn btn-inverse"><%= translate("cancel") %></a>
                                </div>
                            </div>
                            <a href="#myModal2" data-toggle="modal" class="btn green-btn"><%= translate("buy") %></a>
                    </td>
                    <td>AAPL</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><span class="completed"><%= translate("completed") %></span></td>
                    <td>2 / 7 / 2012</td>
                    <td>2 / 7 / 2012</td>
                    <td>3</td>
                    <td>
                        <input type="text" placeholder="" class="input-mini">
                            <div class="modal hide fade myModal" id="myModal3" style="display: none;">
                                <div class="modal-header">
                                    <a class="close" data-dismiss="modal">&times;</a>
                                    <h3><%= translate("orderConfirmation") %></h3>
                                </div>
                                <div class="modal-body">
                                    <table class="table">
                                        <tr>
                                            <td><%= translate("orderId") %>:</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("orderStatus") %>:</td>
                                            <td><span class="completed"><%= translate("completed") %></span></td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("creationDate") %>:</td>
                                            <td>2 / 7 / 2012</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("completionDate") %>:</td>
                                            <td>2 / 7 / 2012</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("transactionFree") %>:</td>
                                            <td>VMW</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("sympol") %>:</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("quantily") %>:</td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn green-btn"><%= translate("ok") %></a>
                                    <a href="#" class="btn btn-inverse"><%= translate("cancel") %></a>
                                </div>
                            </div>
                            <a href="#myModal3" data-toggle="modal" class="btn green-btn"><%= translate("buy") %></a>
                    </td>
                    <td>VMW</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td><span class="uncompleted"><%= translate("uncompleted") %></span></td>
                    <td>2 / 7 / 2012</td>
                    <td>2 / 7 / 2012</td>
                    <td>2</td>
                    <td>
                        <input type="text" placeholder="" class="input-mini">
                        <div class="modal hide fade myModal" id="myModal4" style="display: none;">
                            <div class="modal-header">
                                <a class="close" data-dismiss="modal">&times;</a>
                                <h3><%= translate("orderConfirmation") %></h3>
                            </div>
                            <div class="modal-body">
                                <table class="table">
                                    <tr>
                                        <td><%= translate("orderId") %>:</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td><%= translate("orderStatus") %>:</td>
                                        <td><span class="completed"><%= translate("completed") %></span></td>
                                    </tr>
                                    <tr>
                                        <td><%= translate("creationDate") %>:</td>
                                        <td>2 / 7 / 2012</td>
                                    </tr>
                                    <tr>
                                        <td><%= translate("completionDate") %>:</td>
                                        <td>2 / 7 / 2012</td>
                                    </tr>
                                    <tr>
                                        <td><%= translate("transactionFree") %>:</td>
                                        <td>VMW</td>
                                    </tr>
                                    <tr>
                                        <td><%= translate("sympol") %>:</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td><%= translate("quantily") %>:</td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <a href="#" class="btn green-btn"><%= translate("ok") %></a>
                                <a href="#" class="btn btn-inverse"><%= translate("cancel") %></a>
                            </div>
                        </div>
                        <a href="#myModal4" data-toggle="modal" class="btn green-btn"><%= translate("buy") %></a>
                    </td>
                    <td>AAPL</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td><span class="completed"><%= translate("completed") %></span></td>
                    <td>2 / 7 / 2012</td>
                    <td>2 / 7 / 2012</td>
                    <td>1</td>
                    <td>
                        <input type="text" placeholder="" class="input-mini">
                            <div class="modal hide fade myModal" id="myModal5" style="display: none;">
                                <div class="modal-header">
                                    <a class="close" data-dismiss="modal">&times;</a>
                                    <h3><%= translate("orderConfirmation") %></h3>
                                </div>
                                <div class="modal-body">
                                    <table class="table">
                                        <tr>
                                            <td><%= translate("orderId") %>:</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("orderStatus") %>:</td>
                                            <td><span class="completed"><%= translate("completed") %></span></td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("creationDate") %>:</td>
                                            <td>2 / 7 / 2012</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("completionDate") %>:</td>
                                            <td>2 / 7 / 2012</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("transactionFree") %>:</td>
                                            <td>VMW</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("sympol") %>:</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td><%= translate("quantily") %>:</td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn green-btn"><%= translate("ok") %></a>
                                    <a href="#" class="btn btn-inverse"><%= translate("cancel") %></a>
                                </div>
                            </div>
                        <a href="#myModal5" data-toggle="modal" class="btn green-btn"><%= translate("buy") %></a>
                    </td>
                    <td>VMW</td>
                    <td>1</td>
                </tr>
            </table>
        </div>	
        <div class="pagination pagination-right">
            <ul>
                <li class="disabled"><a href="#">&laquo;</a></li>
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">&raquo;</a></li>
            </ul>
        </div>
    </div>
</div>

